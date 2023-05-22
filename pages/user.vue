<template>
  <div class="container p-5">
    <p>Olá, usuário: {{ $auth.user.username.toUpperCase() }}</p>
    <p>Counter value: {{ counter }}</p>
    <button class="btn btn-primary" @click="increment">Increment</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from '~/store/user';

export default defineComponent({
  setup() {
    const store = useStore();

    const increment = () => {
      store.counter++;
    };

    return {
      increment,
    };
  },
  computed: {
    counter() {
      return useStore().counter;
    },
  },
});
</script>
<style scoped>
.body-main {
  min-height: 600px;
}
</style>