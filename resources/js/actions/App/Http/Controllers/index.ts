import DashboardController from './DashboardController'
import InputController from './InputController'
import AdminUserController from './AdminUserController'
import AdminLaporanController from './AdminLaporanController'
import PokdakanPerubahanController from './PokdakanPerubahanController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
InputController: Object.assign(InputController, InputController),
AdminUserController: Object.assign(AdminUserController, AdminUserController),
AdminLaporanController: Object.assign(AdminLaporanController, AdminLaporanController),
PokdakanPerubahanController: Object.assign(PokdakanPerubahanController, PokdakanPerubahanController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers