/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const SuggestionController = () => import('#controllers/suggestion_controller')

router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
})

router
  .group(() => {
    router.get('/profile', [AuthController, 'profile'])
    router.post('/suggestions', [SuggestionController, 'createSuggestion'])
    router.post('/suggestions/:id/react', [SuggestionController, 'reactSuggestion'])
    router.get('/suggestions', [SuggestionController, 'getSuggestions'])
  })
  .middleware(middleware.auth())
