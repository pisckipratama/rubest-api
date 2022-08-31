pipeline {
  agent none

  stages {
    stage('Install') {
      agent {
        docker {
          image 'node:16-alpine'
        }
      }

      steps {
        sh 'npm install'
        sh 'npm run build --if-present'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
            echo "this is running on develop"
            dockerImage = docker.build("pisckitama/rubest-api:latest");
        }
      }
    }
}