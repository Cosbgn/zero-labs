<template>
  <div class="h-screen bg-gray-900 flex justify-center items-center">
	  <div class='text-center'>
		<h1 class='text-3xl text-white font-bold'>Zero Labs</h1>
	  	<p class='text-gray-600'>Open Source Projects from Zero.sh</p>
	  </div>
  </div>
</template>
<script>
export default {
	mounted(){
		window.location.href = "https://zero.sh/labs"
	}
}
</script>