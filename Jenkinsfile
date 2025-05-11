pipeline {
  agent any

  environment {
    COMPOSE_INTERACTIVE_NO_CLI = 1
  }

  stages {
    stage('Desplegar a producción') {
      steps {
        echo 'Construyendo y desplegando entorno de producción...'
        sh 'docker-compose -f docker-compose.prod.yml down'
        sh 'docker-compose -f docker-compose.prod.yml up -d --build'
      }
    }
  }
}
