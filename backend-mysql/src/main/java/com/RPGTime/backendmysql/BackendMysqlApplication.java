package com.RPGTime.backendmysql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;


@SpringBootApplication
@EnableAutoConfiguration(exclude = KafkaAutoConfiguration.class)
public class BackendMysqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendMysqlApplication.class, args);
	}

}
