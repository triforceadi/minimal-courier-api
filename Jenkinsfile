pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Check out the code from your version control system
                git 'https://github.com/triforceadi/minimal-courier-api.git'
            }
        }
        
        stage('Build API') {
            steps {
                // Build your Node.js API
                bat 'npm install'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                bat 'docker build -t minimal-courier-api .'
            }
        }
    }

    post {
        always {
            // Cleanup steps, if needed
        }
    }
}