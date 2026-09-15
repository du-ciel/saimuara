import DashboardController from './DashboardController'
import InputController from './InputController'
import AdminUserController from './AdminUserController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
InputController: Object.assign(InputController, InputController),
AdminUserController: Object.assign(AdminUserController, AdminUserController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers