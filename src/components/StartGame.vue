<template>
    <div class="content">
		<!-- canvas容器 -->
		<div id="game-container"></div>
	</div>
</template>

<script setup>
import startGame from '@/game/index.js';
import {onMounted, onUnmounted, ref } from 'vue';

const game = ref();

onMounted(() => {
    // 加载canvas
   game.value = startGame('game-container');
})

onUnmounted(() => {
    // 销毁游戏实例
    if (game.value) {
        game.value.destroy(true);
        game.value = null;
    }
});

</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #ffffe5;
		
		#game-container {
			height: 600px;
		}
	}
</style>
