import users from './users'
import laporan from './laporan'
import pokdakanPerubahan from './pokdakan-perubahan'
const admin = {
    users: Object.assign(users, users),
laporan: Object.assign(laporan, laporan),
pokdakanPerubahan: Object.assign(pokdakanPerubahan, pokdakanPerubahan),
}

export default admin