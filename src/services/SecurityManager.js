import { reactive } from 'vue'

// حالت پروژه به صورت reactive برای تست و توسعه
const auditLogs = reactive([])
const pendingActions = reactive([])

// کاربر جاری (نمونه، در پروژه واقعی از Store یا Auth API گرفته شود)
let currentUser = { name: "Admin1", role: "Admin" }

const SecurityManager = {

    // -------------------
    // تنظیم کاربر فعلی
    // -------------------
    setCurrentUser(user) {
        currentUser = user
    },

    // -------------------
    // ثبت عملیات (Immutable Audit Log)
    // -------------------
    logAction(actionDescription, extra = {}) {
        auditLogs.push({
            timestamp: new Date().toISOString(),
            user: currentUser.name,
            role: currentUser.role,
            action: actionDescription,
            ...extra,
            immutable: true
        })
    },

    // -------------------
    // Maker-Checker: ایجاد عملیات حساس
    // -------------------
    createSensitiveAction(actionDescription) {
        const action = {
            id: pendingActions.length + 1,
            action: actionDescription,
            created_by: currentUser.name,
            approved_by: null,
            status: 'pending',
            timestamp: new Date().toISOString()
        }
        pendingActions.push(action)
        this.logAction(`Created sensitive action: ${actionDescription}`, { actionId: action.id })
        return action
    },

    // -------------------
    // تایید عملیات حساس
    // -------------------
    approveAction(actionId) {
        const action = pendingActions.find(a => a.id === actionId)
        if(!action) throw new Error('Action not found')
        if(action.created_by === currentUser.name) throw new Error('Creator cannot approve their own action')
        if(action.status !== 'pending') throw new Error('Action already processed')

        action.approved_by = currentUser.name
        action.status = 'approved'
        this.logAction(`Approved sensitive action: ${action.action}`, { actionId: action.id })
        return action
    },

    // رد عملیات حساس
    rejectAction(actionId) {
        const action = pendingActions.find(a => a.id === actionId)
        if(!action) throw new Error('Action not found')
        if(action.created_by === currentUser.name) throw new Error('Creator cannot reject their own action')
        if(action.status !== 'pending') throw new Error('Action already processed')

        action.status = 'rejected'
        this.logAction(`Rejected sensitive action: ${action.action}`, { actionId: action.id })
        return action
    },

    // -------------------
    // دسترسی بر اساس نقش (RBAC)
    // -------------------
    hasAccess(allowedRoles = []) {
        return allowedRoles.includes(currentUser.role)
    },

    // -------------------
    // دریافت لاگ‌ها و عملیات
    // -------------------
    getAuditLogs() {
        return auditLogs
    },
    getPendingActions() {
        return pendingActions
    }
}

export default SecurityManager
