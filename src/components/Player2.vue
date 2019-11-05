<template>
  <div class="board">
    <div class="row" v-for="(row, indexR) in plots2" v-bind:key="row">
      <div
        class="cell"
        v-for="(item, indexC) in row"
        v-bind:key="item"
        v-on:click="selectCell(indexR, indexC)"
      >
        <div v-if="item==0" class="empty">{{ item }}</div>
        <div v-else class="active">{{ item }}</div>
      </div>
    </div>
    <router-link to="/">Hide Player2</router-link>
  </div>
</template>

<script>
import GameData from "../GameData.js";
export default {
  name: "Player2",
  data() {
    return {
      plots2: GameData.plots2
    };
  }
};
</script>

<style>
</style>