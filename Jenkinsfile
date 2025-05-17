pipeline {
    agent any

    tools {
        maven 'Maven' // Tool name should match the one in Jenkins config
    }

    environment {
        VERSION = '1.0.0'
    }

    parameters {
        booleanParam(name: 'executeTests', defaultValue: true, description: 'Run tests?')
    }

    stages {
        stage('Build') {
            steps {
                echo "Building version ${VERSION}"
                sh 'mvn clean package' // Use bat instead of sh if on Windows
            }
        }

        stage('Test') {
            when {
                expression { return params.executeTests }
            }
            steps {
                echo 'Running tests...'
                sh 'mvn test' // Use bat if on Windows
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying version ${VERSION}"
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
