<template>
    <div class="word-cloud">
      <client-only>
        <wordcloud
          :data="defaultWords"
          nameKey="name"
          :rotate="rotate"
          :fontSize="fontsize"
          :margin="margin"
          valueKey="count"
          :showTooltip="false"
          :wordClick="wordClickHandler">
        </wordcloud>
      </client-only>
    </div>
</template>

<script>
    import * as api from "../api/api";

    export default {
        name: "WorldCloud",
      data() {
        return {
          fontsize:[20,50],
          rotate:{from: 0, to: 0, numOfOrientation: 5 },
          margin:{top: 0, right: 0, bottom: 0, left: 10 },
          defaultWords: [],
        }
      },
      methods: {
        listLabels(){
          api.getLabels(20).then(resp=>{
            if (resp.code === api.success_code) {
              this.defaultWords = resp.data.rows

            }
          })
        },
        wordClickHandler(name,value,vm){
          console.log(name);
          //拿到关键字然后跳转到搜索界面
          location.href="/search?keyword="+encodeURIComponent(name)
        },
      },
      mounted() {
          this.listLabels()
      }
    }
</script>

<style scoped>

</style>
