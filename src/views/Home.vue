<template>
  <div>
    <div class="calc">
      <h1>Vue Testing Sample</h1>
      <h3>
        <select v-model="mode">
          <option value="+">足し算</option>
          <option value="-">引き算</option>
          <option value="*">掛け算</option>
          <option value="/">割り算</option>
        </select>
        <span>をします</span>
      </h3>
      <p class="explain">数字を入力してください</p>

      <form @submit.prevent="submit">
        <div class="num1">
          <label for="num1">値１：</label>
          <input id="num1" type="number" step="0.01" v-model.number="num1" />
        </div>
        <div class="num2">
          <label for="num2">値２：</label>
          <input id="num2" type="number" step="0.01" v-model.number="num2" />
        </div>
        <button type="submit">計算</button>
        <button id="reset" @click.prevent="resetParams">リセット</button>
      </form>

      <transition name="fade">
        <p v-if="result || result === 0" class="result">result: {{ result }}</p>
      </transition>
      <transition name="fade">
        <p v-if="feedback" class="feedback">{{ feedback }}</p>
      </transition>
    </div>

    <transition name="fade">
      <History v-if="history.length" :histories="history" />
    </transition>
  </div>
</template>

<script>
import History from '@/components/History'
import { add, subtract, multiply, divide, bignumber, round } from 'mathjs'

export default {
  name: 'Home',
  components: {
    History
  },
  data() {
    return {
      mode: '+',
      num1: null,
      num2: null,
      result: null,

      feedback: '',
      history: []
    }
  },
  watch: {
    // feedbackを一定時間表示後に消す
    feedback(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.feedback = ''
        }, 4000)
      }
    }
  },
  mounted() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    submit() {
      if (!this.num1 && !this.num2) {
        this.feedback = '適切な値を入力してください'
        return
      } else {
        this.feedback = ''
      }

      this.calculate()
      this.setHistories()
    },
    resetParams() {
      this.mode = '+'
      this.num1 = null
      this.num2 = null
      this.result = null
      this.feedback = ''
    },

    calculate() {
      // 値がnull等の場合、０を代入
      this.num1 = this.num1 || 0
      this.num2 = this.num2 || 0

      switch (this.mode) {
        case '+': {
          const answer = add(bignumber(this.num1), bignumber(this.num2)).toNumber()
          this.result = round(answer, 2) // 小数２桁まで
          break
        }
        case '-': {
          const answer = subtract(bignumber(this.num1), bignumber(this.num2)).toNumber()
          this.result = round(answer, 2)
          break
        }
        case '*': {
          const answer = multiply(bignumber(this.num1), bignumber(this.num2)).toNumber()
          this.result = round(answer, 2)
          break
        }
        case '/': {
          const answer = divide(bignumber(this.num1), bignumber(this.num2)).toNumber()
          this.result = round(answer, 2)
          break
        }
        default:
          console.log('calculate error')
          break
      }
    },
    setHistories() {
      this.history.unshift({
        mode: this.mode,
        num1: this.num1,
        num2: this.num2,
        result: this.result
      })
      localStorage.setItem('history', JSON.stringify(this.history))
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-weight: normal;
}
h3 {
  margin-bottom: 40px;
  span {
    margin-left: 6px;
    font-size: 0.8em;
  }
}
select {
  padding: 5px 8px 2px;
  font-weight: bold;
  background-color: rgb(247, 247, 247);
  border-bottom: 3px solid yellowgreen;
  outline: none;
  cursor: pointer;
}
.explain {
  font-size: 0.7em;
}
.feedback {
  color: crimson;
  font-size: 0.7em;
  transition: 0.5s;
}

/* transition */
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
