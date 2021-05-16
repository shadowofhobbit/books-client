pipeline {
    agent any
    tools {
        jdk 'jdk11'
    }
    environment {
        DATABASE_URL = 'jdbc:postgresql://localhost:5432/books'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Run tests') {
            steps {
                sh 'npm run test --watch false'
            }
        }
        stage('Build docker image') {
            steps {
                sh 'docker build -t shadowofhobbit/books-client .'
            }
        }
        stage('Stop previous container') {
            steps {
                 sh 'docker stop $(docker ps --filter ancestor=shadowofhobbit/books-client -q)'
            }
        }
        stage('Run') {
            steps {
                sh 'docker run --rm -p 4200:4200 -d shadowofhobbit/books-client'
            }
        }

    }
}
