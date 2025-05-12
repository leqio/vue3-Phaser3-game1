<template>
	<div class="content">
		<button @click="toStartGamePage">开始游戏</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

// import {storeToRefs} from 'pinia';
// import useCounterStore from '@/stores/counterStore/counter.js'


// const countStore = useCounterStore();
// const {count} = storeToRefs(countStore);
 
const router = useRouter();

const toStartGamePage = () => {
	router.push({ path: "/startGame" })
};



</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 800px;
		height: 600px;
		background: #ffffe5;
		margin: 0 auto;
	}
</style>
