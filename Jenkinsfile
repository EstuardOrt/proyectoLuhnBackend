pipeline {
  agent any

  environment {
    COMPOSE_INTERACTIVE_NO_CLI = 1
  }

  triggers {
    githubPush()
  }

  options {
    skipDefaultCheckout(true)
  }

  stages {
    stage('Clonar develop para pruebas') {
      steps {
        deleteDir()
        git branch: 'develop', url: 'https://github.com/usuario/repositorio.git'
      }
    }

    stage('Prueba backend') {
      steps {
        sh '''
          response=$(curl -s -X POST http://localhost:5001/validate \
            -H "Content-Type: application/json" \
            -d '{"number":"49927398716"}')
          echo "Respuesta backend: $response"
        '''
      }
    }

    stage('Confirmar despliegue a producción') {
      steps {
        input message: '¿Desplegar el backend a producción?'
        deleteDir()
        git branch: 'main', url: 'https://github.com/usuario/repositorio.git'
        sh 'docker-compose -f docker-compose.prod.yml up -d --build backend'
      }
    }
  }
}