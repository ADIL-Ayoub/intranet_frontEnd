pipeline {
  agent any
  stages {
    stage("verify tooling") {
      steps {
        sh '''
          docker version
          docker info
          docker-compose version 
          curl --version
          jq --version
        '''
      }
    }
    stage('Build ') {
      steps {
        sh 'npm install --legacy-peer-deps'
        // sh 'npm audit fix --force'
        sh 'npm run build'
      }
    }    
    stage('Start container') {
      steps {
        sh 'docker-compose up -d'
        sh 'docker-compose ps'
      }
    }
  }
}
