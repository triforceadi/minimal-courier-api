import groovy.json.JsonSlurper

def getLatestRunId() {
    withCredentials([string(credentialsId: 'bearerTokenGitHub', variable: 'BEARER_TOKEN')]) {
    def response = httpRequest(
            httpMode: 'GET',
            url: "https://api.github.com/repos/triforceadi/minimal-courier-e2e-tests/actions/runs",
            customHeaders: [[name: 'Authorization', value: "Bearer ${BEARER_TOKEN}"]],
            acceptType: 'APPLICATION_JSON')
    def runs = new JsonSlurper().parseText(response.content)
    return runs.workflow_runs[0].id
    }
}

def waitForWorkflowCompletion(runId) {
        withCredentials([string(credentialsId: 'bearerTokenGitHub', variable: 'BEARER_TOKEN')]) {
            def response = httpRequest(
                    httpMode: 'GET',
                    url: "https://api.github.com/repos/triforceadi/minimal-courier-e2e-tests/actions/runs/${runId}",
                    customHeaders: [[name: 'Authorization', value: "Bearer ${BEARER_TOKEN}"]],
                    acceptType: 'APPLICATION_JSON'
            )
            def resposeBody = new JsonSlurper().parseText(response.content)
            return resposeBody.conclusion
        }
}

pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: 'main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/triforceadi/minimal-courier-api.git']]])
                }
            }
        }

        stage('Build and Run Unit Tests') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }
        
        stage('Build and Push Docker Container') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerLogin', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat 'docker build -t triforceadi/minimal-courier-api .'
                        bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        bat 'docker push triforceadi/minimal-courier-api'

                    }   
                }
            }
        }
        stage('Trigger E2E Tests Github Actions') {
            steps {
                script {
                    try {
                        withCredentials([string(credentialsId: 'bearerTokenGitHub', variable: 'BEARER_TOKEN')]) {
                         def response = httpRequest(
                            httpMode: 'POST',
                            url: 'https://api.github.com/repos/triforceadi/minimal-courier-e2e-tests/actions/workflows/76202987/dispatches',
                            customHeaders: [[name: 'Authorization', value: "Bearer ${BEARER_TOKEN}"]],
                            acceptType: 'APPLICATION_JSON',
                            contentType: 'APPLICATION_JSON',
                            requestBody: '{"ref":"main"}'
                            )
                            echo "Response: ${response}"
                        }
                    } catch (Exception e) {
                        echo "Failed to invoke GitHub Actions Workflow: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('E2E Test Results') {
            steps {
                script {
                    def conclusion = 'null'
                    while (conclusion == 'null') {
                            sleep(time: 40, unit: 'SECONDS')
                            conclusion = waitForWorkflowCompletion(getLatestRunId())
                            if(conclusion == 'success') 
                            {
                            currentBuild.result = 'SUCCESS'
                            }
                            else if(conclusion == 'failure')
                            {
                            currentBuild.result = 'FAILURE'
                            }
                        }
                    }
                }
            }
        }
    }

