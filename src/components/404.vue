<template>
    <div class="main-content">
        <div class="notice_page">
		<div class="home_page">
            <a class="notice_retun" href="javascript:history.go(-1);">返回上一页</a>
            <a class="notice_home" :href="homepage">返回首页</a>
        </div>
	</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            homepage: '',
        }
    },
    mounted() {
        let platformInfo = window.sessionStorage.getItem('platformInfo');
        this.homepage = 'HomePage' + JSON.parse(platformInfo).platformType;
    },
}
</script>
<style lang="scss" scoped>
body,html{font-size:12px;font-family:"微软雅黑","Microsoft YaHei",sans-serif;line-height:1.8em;border-collapse:collapse;background:#fff}
a{text-decoration:none}
*{padding:0px;margin:0px;outline:none;word-wrap:break-word}
.main-content{height: 100vh;background: url('../assets/images/bg.png') no-repeat;background-size: 100% 100%;}
div.notice_page{margin:0 auto;position: relative; height: 100vh;background: url('../assets/images/404.jpg') center no-repeat;background-size: 100%;}

div.notice_page .home_page{margin-left: -120px;height:40px;position: absolute; bottom: 12%; left: 50%;  line-height: 30px; width:240px;display: flex;justify-content: space-between;}

div.notice_page .home_page a{display:block;width: 80px; text-align: center; padding: 5px 10px; color:#fff;float:left;margin:0 auto;border:1px solid #ccc;border-radius:3px}

</style>