<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div class="space-y-6">
            <RoleTemplates />
            <TicketMacros />
            <ImpersonateUser />
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

import RoleTemplates from '@/components/admin/RoleTemplates.vue'
import TicketMacros from '@/components/admin/TicketMacros.vue'
import ImpersonateUser from '@/components/admin/ImpersonateUser.vue'

const currentPageTitle = ref("Admin Experience")
</script>
