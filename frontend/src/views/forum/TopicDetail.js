import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ForumNavbar from './ForumNavbar';

function TopicDetail() {
    const location = useLocation();
    const [topic, setTopic] = useState(null);
    const [showNewPostForm, setShowNewPostForm] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');

    const topicId = location.state?.topicId;

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    const fetchTopicData = () => {
        if (!topicId) return;
        const headers = getAuthHeaders();
        fetch(`http://localhost:8080/api/forum/topics/${topicId}`, { headers })
            .then(res => res.json())
            .then(data => setTopic(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchTopicData();
    }, [topicId]);

    if (!topicId) {
        return (
            <div className="forum-page">
                <ForumNavbar currentView={null} setCurrentView={()=>{}} />
                <div className="forum-content">Brak wybranego tematu.</div>
            </div>
        );
    }

    if (!topic) {
        return (
            <div className="forum-page">
                <ForumNavbar currentView={null} setCurrentView={()=>{}} />
                <div className="forum-content">Ładowanie tematu...</div>
            </div>
        );
    }

    const dateOnly = topic.createdAt ? topic.createdAt.split('T')[0] : 'brak daty';

    const handleCreateNewPost = () => {
        setShowNewPostForm(true);
    };

    const handleSubmitNewPost = (e) => {
        e.preventDefault();
        const headers = getAuthHeaders();
        const payload = {
            topicId: topicId,
            content: newPostContent
        };

        fetch('http://localhost:8080/api/forum/posts', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    setShowNewPostForm(false);
                    setNewPostContent('');
                    fetchTopicData();
                } else {
                    alert('Wystąpił błąd przy tworzeniu posta!');
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="forum-page">
            <ForumNavbar currentView={null} setCurrentView={()=>{}} />
            <div className="forum-content">
                <div className="topic-detail">
                    <h2>{topic.title}</h2>
                    <p>{topic.contents}</p>
                    <small>Autor: {topic.author?.username || 'Anonim'} - Utworzony: {dateOnly}</small><br/>
                    {topic.categories && topic.categories.length > 0 && (
                        <small>Kategorie: {topic.categories.map(c=>c.name).join(', ')}</small>
                    )}

                    <h3>Posty:</h3>
                    {topic.posts && topic.posts.length > 0 ? (
                        topic.posts.map(post => {
                            const postDate = post.createdAt ? post.createdAt.split('T')[0] : 'brak daty';
                            return (
                                <div key={post.id} className="post-item">
                                    <p>{post.content}</p>
                                    <small>Autor: {post.author?.username || 'Anonim'} - {postDate}</small>
                                </div>
                            );
                        })
                    ) : (
                        <p>Brak postów</p>
                    )}

                    <button onClick={handleCreateNewPost}>Stwórz nowy wpis</button>
                </div>
            </div>

            {showNewPostForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Nowy wpis</h3>
                        <form onSubmit={handleSubmitNewPost}>
                            <div className="form-group">
                                <label>Treść posta:</label>
                                <textarea
                                    value={newPostContent}
                                    onChange={e => setNewPostContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Utwórz</button>
                                <button type="button" onClick={() => setShowNewPostForm(false)}>Anuluj</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopicDetail;
