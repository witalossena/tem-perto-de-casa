'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */


const Route = use('Route')



// Route.post('users', 'UserController.store')
// Route.get('users', 'UserController.index')

Route.post('login', 'AuthController.login')
Route.post('register', 'AuthController.register')
Route.post('pagamento', 'PagamentoController.index')


Route.get('metodo', "PagamentoController.paymentMethods")
Route.get('lojas/:slug', "LojaController.GetLojaByName")
Route.get('lojas', "LojaController.GetAllStore")

Route.post('loja', "LojaController.Store").middleware(["auth"])
Route.post('produtos', "ProdutoController.store")
Route.post('user/store', "UserController.getUserStore")

Route.put('loja', "LojaController.UpdateStore")
Route.post('products', "UserController.getUserProducts")
Route.get('categories', "CategoryController.index")
Route.get('categories/:cat', "CategoryController.getCategoryStore")
