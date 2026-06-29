<script setup>
import { toast } from 'vue-sonner'

const exito = () => {
  toast.success('¡Receta guardada!', {
    duration: 2500,
    closeButton: false,
    // Usamos classes para estilizar el contenedor del toast
    classes: {
      toast: 'bg-green-500 border border-green-800 text-white rounded-xl shadow-xl  flex items-center justify-center p-4 min-w-[250px] max-w-[320px] max-h-[10px]',
      title: 'text-sm font-medium text-white',
    },
  })
}

const error = () => {
    toast.error('Error', {
        style: {
            background: '#fee2e2',
            border: '2px solid #dc2626',
            borderRadius: '8px'
        },
        class: 'text-red-700 font-bold'
    })
}

const custom = () => {
    toast('Notificación', {
        class: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl',
        duration: 5000,
        closeButton: true
    })
}
</script>

<template>
    <button @click="exito" class="border border-red-600">Success verde</button>
    <button @click="error">Error rojo</button>
    <button @click="custom">Custom gradient</button>
</template>