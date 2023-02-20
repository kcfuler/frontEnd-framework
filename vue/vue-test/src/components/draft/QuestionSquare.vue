<template>
  <OdinHeader></OdinHeader>
  <div class="QASquare">
    <div class="input-area">
      <MyTransition mode="slideFromLeft">
        <el-image
          src="../../../public/images/odin.png"
          fit="fill"
          style="height: 350px; margin-bottom: -50px; margin-top: -20px"
        />
      </MyTransition>
      <MyTransition mode="slideUp">
        <div class="input-wrapper">
          <el-select
            v-model="searchInputValue"
            filterable
            remote
            placeholder="您想问什么"
            :remote-method="remoteMethod"
            :loading="loading"
            no-data-text="暂无"
            class="input-self"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              @click="changeCurrentNum(item.id)"
            />
          </el-select>
          <div class="search_r" @click="filterByTitle(searchInputValue)">
            Odin 一下
          </div>
          <el-button
            type="warning"
            style="height: 3rem; margin-left: 1rem"
            @click="toggleQuestionnaire"
            >我要提问</el-button
          >
          <el-button
            type="success"
            style="height: 3rem; margin-left: 1rem"
            @click="filterByUser"
            >我的问题</el-button
          >
        </div>
      </MyTransition>
    </div>

    <div class="question-container">
      <div class="header">
        <h1 style="font-size: 45px">问答广场</h1>

        <div class="right">
          <!--					<div class="toggle" @click="showAll">显示全部</div>-->
          <div @click="isSquare = !isSquare" class="toggle">切换</div>
        </div>
      </div>

      <ul v-show="isSquare" class="question-list--square">
        <li
          v-for="QA in QAList"
          @click="changeCurrentNum(QA.questionId)"
          :key="QA.questionId"
          class="list-item"
        >
          <QuestionInfo
            :user-avatar="QA.userInfo.avatarUrl"
            :questionTitle="QA.title"
            :user-name="!isSquare ? QA.userInfo.userName : null"
            :create-time="!isSquare ? QA.createTime : null"
          />
        </li>
      </ul>
      <ul v-show="!isSquare" class="question-list--normal">
        <li
          v-for="QA in QAList"
          @click="changeCurrentNum(QA.questionId)"
          :key="QA.questionId"
          class="list-item"
        >
          <QuestionInfo
            :user-avatar="QA.userInfo.avatarUrl"
            :questionTitle="QA.title"
            :user-name="!isSquare ? QA.userInfo.userName : null"
            :create-time="!isSquare ? QA.createTime : null"
          />
        </li>
      </ul>

      <el-result v-if="QAList.length <= 0" icon="info" title="Info Tip">
        <template #sub-title>
          <p>暂时没有相关问题</p>
        </template>
        <template #extra>
          <el-button type="primary" @click="showAll">显示全部</el-button>
        </template>
      </el-result>
    </div>
    <!--    回答-->
    <el-dialog v-model="showQA" width="80%">
      <template #header="{ close, titleId, titleClass }">
        <h1 style="color: black; padding-bottom: 0">
          {{ QAList[currentNum].title }}
        </h1>
      </template>
      <QuestionInfo
        :userName="QAList[currentNum].userInfo.userName"
        :userAvatar="QAList[currentNum].userInfo.avatarUrl"
        :createTime="QAList[currentNum].createTime"
      ></QuestionInfo>
      <v-md-preview-html
        :html="QAList[currentNum].contentBody.contentHtml"
        preview-class="vuepress-markdown-body"
      >
      </v-md-preview-html>
      <div class="button-group">
        <!--			<el-button  size='large'><el-image src="public/icons/approve.svg" style='width: 30px;height: 30px; padding-right: 1rem'></el-image>我也要问</el-button>-->
        <!--				<el-button  size='large'><el-icon size='30px'><CirclePlusFilled /></el-icon></el-button>-->
        <!--				<el-button  size='large'><el-image src="public/icons/approve.svg" style='width: 30px;height: 30px; padding-right: 1rem'></el-image>我也要问</el-button>-->
        <el-button size="large" @click="likeQuestion"
          ><el-image
            src="public/icons/approve.svg"
            style="width: 30px; height: 30px; padding-right: 1rem"
          ></el-image
          >{{ QAList[currentNum].likeNum }}</el-button
        >
      </div>
      <el-divider></el-divider>
      <div
        class="reply-content-container"
        v-if="QAList[currentNum].replayList.length > 0"
      >
        <div
          class="reply-content"
          v-for="replayItem in QAList[currentNum].replayList"
        >
          <v-md-preview-html
            :html="replayItem.contentBody.contentHtml"
            preview-class="vuepress-markdown-body"
          >
          </v-md-preview-html>
          <div class="button-group">
            <el-button size="large" @click="likeReply(replayItem)"
              ><el-image
                src="public/icons/approve.svg"
                style="width: 30px; height: 30px; padding-right: 1rem"
              ></el-image
              >{{ replayItem.likeNum }}</el-button
            >
          </div>
          <QuestionInfo
            :userAvatar="replayItem.userInfo.avatarUrl"
            :userName="replayItem.userInfo.userName"
          >
          </QuestionInfo>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showQA = false"> 取消 </el-button>
          <el-button type="primary" @click="showQA = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <!--    问卷-->
    <el-dialog v-model="showQuestionnaire" width="80%">
      <template #header="{ close, titleId, titleClass }">
        <h3 style="text-align: center">提问问卷</h3>
      </template>
      <div class="form-container" style="padding: 0 2rem 0 2rem">
        <h3>问题标题</h3>
        <el-input
          v-model="questionnaireTitle"
          id="questionnaireTitle"
          autocomplete="off"
        />
        <h3>问题内容</h3>
        <v-md-editor
          v-model="mdValue"
          height="400px"
          @save="handleMdValueSave"
          @upload-image="handleUploadImg"
          :disabled-menus="[]"
        >
        </v-md-editor>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showQuestionnaire = false"> 取消 </el-button>
          <el-button type="primary" @click="handleQuestionnaireSubmit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, toRaw, watch } from "vue";
import OdinHeader from "../../component/IndexPage/OdinHeader.vue";
import QuestionInfo from "../../component/IndexPage/SupportComponent/QuestionInfo.vue";
import axios from "axios";
import deepcopy from "deepcopy";
import { useRoute } from "vue-router";
import MyTransition from "../../component/IndexPage/SupportComponent/MyTransition.vue";
import message from "../../utils/message.js";

// 从其它页面跳转过来
onMounted(() => {
  const route = useRoute();
  let query = route.query;
  // if( localStorage.getItem('isFirst') ) return ;
  if (query.self == 1) {
    setTimeout(() => {
      filterByUser();
    }, 50);
  }
  if (query.questionId) {
    setTimeout(() => {
      changeCurrentNum(query.questionId);
    }, 50);
  }

  if (query.searchStr) {
    setTimeout(() => {
      filterByTitle(query.searchStr);
    }, 50);
  }
  // setTimeout(() => {
  // 	localStorage.setItem('isFirst',JSON.stringify(1))
  // })
});

// 刷新的时候取消对路由状态的响应
// onUnmounted(() => {
// 	console.log(111)
// 	localStorage.removeItem('isFirst');
// })

function filterByTitle(title) {
  // console.log('title', title)
  QAList.value = backupList.value.filter((item) => {
    return item.title.includes(title);
  });
}

// 获取问题列表 ， 构建备选项
// const QAList = ref([
// 	{
// 		questionId: 35409572529176576,
// 		userInfo: {
// 			userId: 41,
// 			userName: 'test03',
// 			avatarUrl: null
// 		},
// 		title: '问题标题1',
// 		category: 'unResolved',
// 		tag: '账号登录问题',
// 		replayList: [
// 			{
// 				replayId: 35469143268392960,
// 				questionId: 35409572529176576,
// 				userInfo: {
// 					userId: 18,
// 					userName: 'root',
// 					avatarUrl: null
// 				},
// 				contentBody: {
// 					content: '回答内容',
// 					contentHtml: '<h3>回答内容<h3>'
// 				},
// 				isAccepted: true,
// 				likeNum: 3
// 			}
// 		],
// 		viewCounts: 7,
// 		createTime: '2023-02-05 17:04'
// 	},
// 	{
// 		questionId: 35416092788654080,
// 		userInfo: {
// 			userId: 41,
// 			userName: 'test03',
// 			avatarUrl: null
// 		},
// 		title: '问题标题2',
// 		category: 'unResolved',
// 		tag: '组件bug',
// 		replayList: [],
// 		viewCounts: 0,
// 		createTime: '2023-02-05 17:30'
// 	},
// 	{
// 		questionId: 36037258192617472,
// 		userInfo: {
// 			userId: 41,
// 			userName: 'test03',
// 			avatarUrl: 'http://121.36.109.90:8000/api/image/test03/63e10110e4b09837b34036e2.jpeg'
// 		},
// 		title: '待审核问题',
// 		category: 'unReviewed',
// 		tag: '组件bug',
// 		replayList: [],
// 		viewCounts: 0,
// 		createTime: '2023-02-07 10:39'
// 	},
// 	{
// 		questionId: 36068976576430080,
// 		userInfo: {
// 			userId: 41,
// 			userName: 'test03',
// 			avatarUrl: 'http://121.36.109.90:8000/api/image/test03/63e10110e4b09837b34036e2.jpeg'
// 		},
// 		title: '待审核问题',
// 		category: 'unReviewed',
// 		tag: '组件bug',
// 		replayList: [],
// 		viewCounts: 0,
// 		createTime: '2023-02-07 12:45'
// 	},
// 	{
// 		questionId: 36131431872724992,
// 		userInfo: {
// 			userId: 41,
// 			userName: 'test03',
// 			avatarUrl: 'http://121.36.109.90:8000/api/image/test03/63e10110e4b09837b34036e2.jpeg'
// 		},
// 		title: '问题标题2',
// 		category: 'unResolved',
// 		tag: '组件bug',
// 		replayList: [],
// 		viewCounts: 0,
// 		createTime: '2023-02-07 08:53'
// 	}
// ])
const QAList = ref([]);
const backupList = ref([]);
backupList.value = deepcopy(toRaw(QAList.value));
const optionList = ref([]);
async function getQAList() {
  const result = await axios(
    `http://121.36.109.90:8000/api/help/questionList/hot`
  );
  if (result.success) {
  }
  QAList.value = result.data.data;
  // console.log('QAList.value', QAList.value)
  backupList.value = deepcopy(result.data.data);
  buildOptions();
  return result;
}
getQAList();

// 切换当前显示的文章
const currentNum = ref(0);
function changeCurrentNum(id) {
  showQA.value = true;

  for (let i = 0; i < QAList.value.length; i++) {
    if (QAList.value[i].questionId === id) {
      currentNum.value = i;
      return;
    }
  }
}

//搜索框相关逻辑
const loading = ref(false);
const searchInputValue = ref("");
const options = ref([]);
function remoteMethod(query) {
  if (query) {
    searchInputValue.value = query;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = optionList.value.filter((item) => {
        return item.title.includes(query.trim());
      });
    }, 100);
  }
}
function buildOptions() {
  QAList.value.forEach((item) => {
    optionList.value.push({
      id: item.questionId,
      title: item.title,
    });
  });
}

// 问卷逻辑
const showQuestionnaire = ref(false);
const questionnaireTitle = ref("");
const mdValue = ref("");
const mdContent = ref("");
const mdContentHtml = ref("");
function toggleQuestionnaire() {
  showQuestionnaire.value = true;
}
function handleMdValueSave(text, html) {
  mdContent.value = text;
  mdContentHtml.value = html;
  message.success("保存成功");
}
function handleUploadImg(text, image, files) {}
function handleQuestionnaireSubmit() {
  showQuestionnaire.value = false;

  if (!localStorage.getItem("UserId")) {
    message.error("您还没登录哦");
    return;
  }

  let data = JSON.stringify({
    userId: localStorage.getItem("UserId"),
    title: questionnaireTitle.value,
    contentBody: {
      content: mdContent.value,
      contentHtml: mdContentHtml.value,
    },
    tag: tag.value,
  });

  let config = {
    method: "post",
    url: "http://121.36.109.90:8000/api/help/publish/question",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    data,
  };

  axios(config)
    .then((res) => {
      console.log("submit", res);
    })
    .catch((reject) => {
      console.log("submit error", reject);
    });
}

// 卡片展示相关逻辑
const isSquare = ref(true);
const showQA = ref(false);
function filterByUser() {
  const id = localStorage.getItem("UserId");
  QAList.value = QAList.value.filter((QA) => {
    return QA.userInfo.userId === id;
  });
}
function showAll() {
  QAList.value = toRaw(backupList.value);
}

//按钮组逻辑 ---------------------------------------------------------------------
let likeQuestionState = ref(false);
let replayId = ref("");
function likeQuestion() {
  if (!likeQuestionState.value) {
    QAList.value[currentNum.value].likeNum++;
    likeQuestionState.value = true;
  } else {
    QAList.value[currentNum.value].likeNum--;
    likeQuestionState.value = false;
  }
}
const likeReplayState = ref(false);
function likeReply(replayItem) {
  if (!likeReplayState.value) {
    replayItem.likeNum++;
    likeReplayState.value = true;
    replayId.value = replayItem.replayId;
  } else {
    replayItem.likeNum--;
    likeReplayState.value = false;
  }
}

let configMap = new Map();
configMap.set("likeReplay", {
  url: "http://121.36.109.90:8000/api/help/likeReplay",
});
configMap.set("acceptQuestion", {
  url: "http://121.36.109.90:8000/api/help/likeQuestion",
});
watch(
  () => showQA.value,
  () => {
    if (showQA.value !== false) return;
    if (likeQuestionState) {
      axios
        .post(configMap.get("acceptQuestion").url, {
          questionId: QAList.value[currentNum.value].questionId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((reject) => {
          console.log(reject);
        });
    }
    if (likeReplayState) {
      axios
        .post(configMap.get("likeReplay").url, {
          replayId: replayId.value,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((reject) => {
          console.log(reject);
        });
    }
  }
);
</script>

<style scoped lang="scss">
.QASquare {
  width: 60vw;
  margin: 0 auto;
  .input-area {
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-bg {
      height: 20vw;
      width: 30vw;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .search_r {
      cursor: pointer;
      width: 100px;
      height: 3rem;
      line-height: 50px;
      background-color: #409eff;
      border-radius: 0 5px 5px 0;
      font-size: 14px;
      color: #fff;
      text-align: center;
      z-index: 1000;

      &:hover {
        background-color: darken(#409eff, 10%);
      }
    }

    .input-wrapper {
      display: flex;
      align-items: center;

      .input-self {
        width: 40vw;
        height: 3rem;
      }
    }
  }

  .question-container {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right {
        display: flex;
        gap: 1rem;
        align-items: center;

        .toggle {
          height: 1rem;
          padding: 1rem 2rem 1rem 2rem;
          border: 1px solid #9c9ea3;
          border-radius: 10px;
          line-height: 1rem;
          font-weight: bold;

          transition: all 0.3s;
          &:hover {
            color: white;
            background-color: #3b9dff;
          }
        }
      }
    }

    ul {
      margin: 0;
      padding: 0;
    }
    .list-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      border: 1px solid #9c9ea3;
      border-radius: 10px;
      padding: 1rem 3rem 1rem 1rem;

      animation: slide-up 0.5s ease-in-out both;
      //overflow: clip;

      transition: all 0.3s;
      &:hover {
        color: white;
        background-color: #3b9dff;
      }
    }

    .question-list--square {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .question-list--normal {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}

.button-group {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  padding-top: 1rem;
}

// 回答部分

.slide-up {
  animation: slide-up 0.5s ease-in-out both;
}

@keyframes slide-up {
  from {
    transform: translateY(50%);
    opacity: 0.5;
  }
  to {
    transform: none;
  }
}
</style>
