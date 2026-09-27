import users from './users'
import exportMethod from './export'
import laporan from './laporan'
import pokdakanPerubahan from './pokdakan-perubahan'

const admin = {
    users: Object.assign(users, users),
    export: Object.assign(exportMethod, exportMethod),
    laporan: Object.assign(laporan, laporan),
    pokdakanPerubahan: Object.assign(pokdakanPerubahan, pokdakanPerubahan),
}

export default admin