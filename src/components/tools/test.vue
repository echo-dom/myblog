<template>
    <div class="test-page">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="实际时间">
                <el-input v-model="form.realtime"></el-input>
            </el-form-item>
            <el-form-item label="理想时间">
                <el-input v-model="form.time"></el-input>
            </el-form-item>
            <el-form-item label="差异">
                <el-input v-model="form.diff"></el-input>
            </el-form-item>
            <el-form-item label="次数">
                <el-input v-model="form.cou"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">执行</el-button>
                <el-button type="primary" @click="onStop">暂停</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: { realtime: "", time: "", diff: "",cou:0 },
                timer: null,
            }
        },
        created() {

        },
        methods: {
            onSubmit(speed) {
                var speed = 300,
                    count = 1,
                    star = new Date().getTime();
                var that = this;
                // 
                function instanc() {
                    that.form.time = (count * speed);
                    that.form.realtime = (new Date().getTime() - star);
                    count++
                    that.form.diff = (that.form.realtime - that.form.time);
                    that.timer = setTimeout(() => {
                        instanc();
                    }, speed - that.form.diff)
                }
                setTimeout(() => {
                    that.form.cou +=1;
                    instanc();
                }, speed)
            },
            onStop() {
                clearTimeout(this.timer)
            },
            backHomePage() {
                this.$router.push('/')
            }
        }

    }
</script>

<style lang="less" scoped>

</style>