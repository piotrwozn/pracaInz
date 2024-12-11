import React, { useState, useEffect } from 'react';
import ForumNavbar from './ForumNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/main/Forum.css';

function Forum() {
    const [currentView, setCurrentView] = useState('user-topics');
    const [showNewTopicForm, setShowNewTopicForm] = useState(false);

    const [userTopics, setUserTopics] = useState([]);
    const [allTopics, setAllTopics] = useState([]);
    const [relatedTopics, setRelatedTopics] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    useEffect(() => {
        if (location.state?.view) {
            setCurrentView(location.state.view);
            navigate('/forum', { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        const headers = getAuthHeaders();

        if (currentView === 'user-topics') {
            fetch('http://localhost:8080/api/forum/topics/user', { headers })
                .then(res => res.json())
                .then(data => setUserTopics(data))
                .catch(err => console.error(err));
        }

        if (currentView === 'all-topics') {
            fetch('http://localhost:8080/api/forum/topics/all', { headers })
                .then(res => res.json())
                .then(data => setAllTopics(data))
                .catch(err => console.error(err));
        }

        if (currentView === 'related-topics') {
            fetch('http://localhost:8080/api/forum/topics/related', { headers })
                .then(res => res.json())
                .then(data => setRelatedTopics(data))
                .catch(err => console.error(err));
        }

        fetch('http://localhost:8080/api/forum/categories', { headers })
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));

    }, [currentView]);

    const handleCreateNewTopic = () => {
        setShowNewTopicForm(true);
    };

    const handleSubmitNewTopic = (e) => {
        e.preventDefault();
        if (selectedCategories.length > 3) {
            alert('Możesz wybrać maksymalnie 3 kategorie');
            return;
        }

        const payload = {
            title: newTitle,
            contents: newContent,
            categoryIds: selectedCategories.map(cat => cat.id)
        };

        const headers = getAuthHeaders();

        fetch('http://localhost:8080/api/forum/topics', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    setShowNewTopicForm(false);
                    setNewTitle('');
                    setNewContent('');
                    setSelectedCategories([]);

                    if (currentView === 'user-topics') {
                        fetch('http://localhost:8080/api/forum/topics/user', { headers })
                            .then(r => r.json())
                            .then(data => setUserTopics(data))
                            .catch(err => console.error(err));
                    } else if (currentView === 'all-topics') {
                        fetch('http://localhost:8080/api/forum/topics/all', { headers })
                            .then(r => r.json())
                            .then(data => setAllTopics(data))
                            .catch(err => console.error(err));
                    }
                } else {
                    alert('Wystąpił błąd przy tworzeniu tematu!');
                }
            })
            .catch(err => console.error(err));
    };

    const handleCategorySelection = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            if (selectedCategories.length < 3) {
                setSelectedCategories([...selectedCategories, category]);
            } else {
                alert('Możesz wybrać maksymalnie 3 kategorie!');
            }
        }
    };

    const handleTopicClick = (topicId) => {
        navigate('/forum/topic', { state: { topicId: topicId } });
    };

    const renderTopicsList = (topics) => {
        return (
            <div className="topics-list">
                {topics.map(topic => {
                    const dateOnly = topic.createdAt ? topic.createdAt.split('T')[0] : 'brak daty';
                    return (
                        <div key={topic.id} className="topic-item" onClick={() => handleTopicClick(topic.id)}>
                            <h3>{topic.title}</h3>
                            <p>{topic.contents}</p>
                            <small>Utworzony: {dateOnly}</small><br/>
                            {topic.categories && topic.categories.length > 0 && (
                                <small>Kategorie: {topic.categories.map(c=>c.name).join(', ')}</small>
                            )}
                            {topic.category && (
                                <small>Kategoria: {topic.category.name}</small>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderContent = () => {
        switch(currentView) {
            case 'user-topics':
                return (
                    <div>
                        <h2>Twoje tematy</h2>
                        <button onClick={handleCreateNewTopic}>Stwórz nowy temat</button>
                        {renderTopicsList(userTopics)}
                    </div>
                );
            case 'all-topics':
                return (
                    <div>
                        <h2>Wszystkie tematy</h2>
                        <button onClick={handleCreateNewTopic}>Stwórz nowy temat</button>
                        {renderTopicsList(allTopics)}
                    </div>
                );
            case 'related-topics':
                return (
                    <div>
                        <h2>Powiązane tematy</h2>
                        {renderTopicsList(relatedTopics)}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="forum-page">
            <ForumNavbar currentView={currentView} setCurrentView={setCurrentView} />
            <div className="forum-content">
                {renderContent()}
            </div>

            {showNewTopicForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Nowy temat</h3>
                        <form onSubmit={handleSubmitNewTopic}>
                            <div className="form-group">
                                <label>Tytuł:</label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Treść:</label>
                                <textarea
                                    value={newContent}
                                    onChange={e => setNewContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Wybierz kategorie (max 3):</label>
                                <div className="categories">
                                    {categories.map((cat, index) => (
                                        <div
                                            key={index}
                                            className={`category-item ${selectedCategories.includes(cat) ? 'selected' : ''}`}
                                            onClick={() => handleCategorySelection(cat)}
                                        >
                                            {cat.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Utwórz</button>
                                <button type="button" onClick={() => setShowNewTopicForm(false)}>Anuluj</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Forum;
