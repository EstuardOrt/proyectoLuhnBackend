pipeline {
  agent {
    docker {
      image 'node:18'
    }
  }

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Instalar dependencias y ejecutar pruebas') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }

    stage('Confirmar despliegue a producción') {
      when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
      }
      steps {
        echo 'Despliegue'
      }
    }
  }
}
