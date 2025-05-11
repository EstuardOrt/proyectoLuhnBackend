pipeline {
  agent any

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
