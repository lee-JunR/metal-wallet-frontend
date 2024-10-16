<template>
  <div :class="$style.div">
    <MainHeader />
    <img :class="$style.imageIcon" alt="" src="@/assets/mascord2.png" />
    <div :class="$style.div1">
      <p :class="$style.p">나의 대기순서</p>
      <p :class="$style.p1">
        <b>{{ waitingCount }}</b>
      </p>
    </div>
    <div :class="$style.rectangleParent">
      <div :class="$style.groupChild" />
      <div :class="$style.groupItem" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import MainHeader from '../../components/MainHeader.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "WaitingRoom",
  components: {
    MainHeader,
  },
  setup() {
    const waitingCount = ref(0);
    const router = useRouter();

    const checkWaitingCount = async () => {
      try {
        // 라우트 쿼리 파라미터에서 id 값을 가져옴
        const id = router.currentRoute.value.query.id;

        // id 값이 없을 경우 예외 처리
        if (!id) {
          throw new Error("뮤지컬 ID가 제공되지 않았습니다.");
        }

        // id를 사용해 API 요청
        const response = await axios.get(
          `https://matalwallet.duckdns.org/metal-wallet-server/api/musicals/${id}/dates`
        );

        waitingCount.value = response.data.waiting_count;
        console.log(waitingCount.value);

        // waitingCount 값이 없을 경우 다음 페이지로 이동
        if (waitingCount.value === undefined) {
          router.push(`/booking/${id}/dates`);
        } else {
          setTimeout(checkWaitingCount, 2000); // 2초 후 다시 체크
        }
      } catch (error) {
        console.error("대기열 상태를 확인하는 중 오류 발생:", error);
      }
    };

    onMounted(() => {
      setTimeout(() => {
        checkWaitingCount(); // 1초 대기 후 초기 체크
      }, 1000); // 1000ms = 1초
    });

    return {
      waitingCount,
    };
  },
});
</script>

<style module>
.solarwalletOutlineIcon {
  position: absolute;
  top: 11px;
  left: 14px;
  width: 24px;
  height: 24px;
  overflow: hidden;
}

.b {
  position: absolute;
  top: 14px;
  left: 43px;
}

.imageIcon {
  position: absolute;
  top: 99px;
  left: 68px;
  width: 242px;
  height: 371px;
  object-fit: cover;
}

.p {
  margin: 0;
  font-weight: 500;
}

.p1 {
  margin: 0;
  font-size: 36px;
}

.div1 {
  position: absolute;
  top: 493px;
  left: 131px;
  color: #000;
  text-align: center;
  font-size: 20px;
}

.groupChild {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 15px;
  background-color: #dfdfdf;
  width: 315px;
  height: 27px;
}

.groupItem {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 15px;
  background-color: #c54966;
  width: 301px;
  height: 27px;
}

.rectangleParent {
  position: absolute;
  top: 581px;
  left: 29px;
  width: 315px;
  height: 27px;
}

.div {
  width: 100%;
  position: relative;
  background-color: #fafafa;
  height: 812px;
  overflow: hidden;
  text-align: left;
  font-size: 16px;
  color: #6e6e6e;
  font-family: Roboto;
}
</style>