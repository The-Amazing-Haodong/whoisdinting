import Vue from 'vue';
import { Popup,cell } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Stepper } from 'vant';
import { NumberKeyboard,NoticeBar,Swipe,SwipeItem} from 'vant';
import { Notify } from 'vant';
import { Loading } from 'vant';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Form);
Vue.use(Field);
Vue.use(Popup)
Vue.use(cell)
Vue.use(Button)
Vue.use(Stepper)
Vue.use(NumberKeyboard)
Vue.use(NoticeBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.prototype.$notify=Notify