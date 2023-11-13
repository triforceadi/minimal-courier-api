pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/triforceadi/minimal-courier-api.git']]])
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Add your build steps here
                    echo 'Building the project'
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Build and push Docker image
                    sh 'docker build -t your-docker-image .'
                    sh 'docker push your-docker-image'
                }
            }
        }
    }

    post {
        always {
            // This block is executed always, you can put cleanup or post-build actions here
            echo 'Performing cleanup or post-build actions'
        }
    }
}