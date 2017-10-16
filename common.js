if (Vue) {
    /**
     * anyi-page-view
     * 移动端页面 卡头 或者卡尾 或者内容滚动
     * 与base.css配合使用
     * */
    Vue.component('anyi-page-view', {
        template: `<div style="pageStyle">
                        <slot name="header"></slot>
                        <slot></slot>
                        <slot name="footer"></slot>
                   <div>`,
        data: function () {
            return {
                pageStyle: {
                    height: '100vh',
                    width: '100vw',
                    background: 'transparent',
                    boxSizing: 'border-box'
                }
            }
        }
    })

    /**
     * anyi-loading-icon
     */
    Vue.component('anyi-loading', {
        template: `<div class="anyi-loading" :style="{height:height, width:width}">
                        <div class="anyi-loading-line" 
                            :style="{
                                   'display': loadingType,
                                   'border-width': loadingWidth, 
                                   'border-color': loadingColor,
                                   'border-style': 'solid' 
                                   'border-bottom-color': 'transparent'}">
                        </div>
                        <slot></slot>
                   </div>`,
        props: {
            height: {
                type: String,
                default: '24px',
            },
            width: {
                type: String,
                default: '24px'
            },
            type: {
                type: String,
                default: 'inline'
            },
            loadingWidth: {
                type: String,
                default: '3px'
            },
            loadingColor: {
                type: String,
                default: '#20a0ff'
            }
        },
        computed: {
            loadingType: function(){
                switch(this.type){
                    case 'inline':
                        return 'inline-block';
                    case 'block':
                        return 'block'
                }
            }
        }
    })


    /**
     * anyi-button 
     * 按钮组件
     */
    Vue.component('anyi-button', {
        name: 'AnyiButton',
        componentName: 'AnyiButton',
        template: `<button @click="click" type="button" class="anyi-button" :class="[typeClass, sizeClass]">                       
                        <span v-if="!loading"><slot></slot></span>
                        <span></span>
                   </button>`,
        props: {
            type: String,
            size: String,
            loading: Boolean,
            loadingText: {
                type: String,
                default: '加载中'
            }
        },
        computed: {
            typeClass: function () {
                switch (this.type) {
                    case 'text':
                        return 'anyi-button-text'
                    case 'primary':
                        return 'anyi-button-primary';
                    default:
                        return 'anyi-button-default';
                }
            },
            sizeClass: function () {
                switch (this.size) {
                    case 'large':
                        return 'anyi-button-large';
                    case 'small':
                        return 'anyi-button-small';
                    case 'mini':
                        return 'anyi-button-mini';
                    default:
                        return '';
                }
            }
        },
        methods: {
            click: function () {
                this.$emit('click')
            }
        }

    })

    /**
     * anyi-radio 单选按钮组件
     * @props name 原生name 属性
     * @props disabled 是否禁用
     * @props v-model 双向绑定的值
     * @props label 单选按钮传递的值
     */
    Vue.component('anyi-radio', {
        name: 'AnyiRadio',
        componentName: 'AnyiRadio',
        template: `<label class="anyi-radio" @click="check" :class="{'is-disabled': disabled}">
                     <span class="anyi-radio-input" :class="{'is-checked': label == value}">                    
                        <input type="radio" :disabled="disabled" :name="name" :value="label" class="anyi-radio-original"/>
                     </span>
                     <span class="anyi-radio-label">
                        <slot></slot>
                     </span>
                  </label>`,
        props: {
            name: String,//radio原生那么属性
            disabled: { type: Boolean, default: false },
            label: [Number, String],
            value: [Number, String]
        },
        computed: {
            //检查组件外部是不由包裹组件
            isGroup: function () {
                var parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'AnyiRadioGroup') {
                        parent = parent.$parent;
                    } else {
                        this._radioGroup = parent;
                        return true;
                    }
                }
                return false;
            },
        },
        //改变model通讯方式 prop 传送的值 event 传送的事件{prop, event}
        model: {
            event: 'input'
        },
        beforeMount: function () {
            //将父组件的值 赋值给自己
            if (this.isGroup) this.value = this._radioGroup.value;
        },
        methods: {
            check: function () {
                console.log(this.disabled);
                if (this.disabled) return;
                //由包裹组件 传值给包裹组件
                if (this.isGroup) {
                    console.log(this.value, this.label)
                    this.value = this.label;
                    this._radioGroup.$emit('input', this.label);
                    this.value = this._radioGroup.value;
                } else {
                    this.$emit('input', this.label);
                }
            }
        }
    });

    /**
     * 单选按钮组 anyi-radio-group 
     * @props v-model 绑定的数据
     * @v-on change  change 事件
     */
    Vue.component('anyi-radio-group', {
        name: 'AnyiRadioGroup',
        componentName: 'AnyiRadioGroup',
        template: `<div class="anyi-radio-group">
                        <slot></slot>                       
                    </div>
                   `,
        props: {
            value: [Number, String],
        },
        model: {
            event: 'input'
        },
        watch: {
            value: function (value) {
                this.$emit('change', value)
            }
        }
    })

    /**
     * anyi-card
     * 卡片组件
     */
    Vue.component('anyi-card', {
        name: 'AnyiCard',
        componentName: 'AnyiCard',
        template: `<div class="anyi-card">
                        <slot name="card-header"></slot>   
                        <slot name="card-body"></slot>
                        <slot name="card-footer"></slot>  
                   </div>           
                  `,
        props: {}
    })

    /**
     * anyi-card-header
     * 卡片組件-头部组件
     * @props title 头部标题
     */
    Vue.component('anyi-card-header', {
        name: 'AnyiCardHeader',
        component: 'AnyiCardHeader',
        template: `<div class="anyi-card-header"> 
                        {{title}}
                    </div>`,
        props: {
            title: String,
        },

    })

    /**
     * anyi-card-body
     * 卡片組件-主体组件
     */
    Vue.component('anyi-card-body', {
        name: 'AnyiCardBody',
        component: 'AnyiCardBody',
        template: `<div class="anyi-card-body"> 
                       <slot></slot>
                    </div>`,
    });

    /**
     * anyi-card-footer
     * 卡片組件-底部组件
     */
    Vue.component('anyi-card-footer', {
        name: 'AnyiCardFooter',
        component: 'AnyiCardFooter',
        template: `<div class="anyi-card-footer"> 
                       <slot></slot>
                    </div>`,
    })




} else {
    throw new Error('Vue is not defined')
}