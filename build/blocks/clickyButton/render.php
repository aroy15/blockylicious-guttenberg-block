<?php
	$block_wrapper_attributes = get_block_wrapper_attributes();
	$post_uri = "#";
	if(!$attributes['enableCustomLink'] && ($attributes['linkedPost'] ?? null)){
		$post_uri = get_permalink( $attributes['linkedPost']);
	}
	if($attributes['enableCustomLink'] && '' !== $attributes['customLink']){
		$post_uri = $attributes['customLink'];
	}
	if($attributes['linkNewTab']){
		$target = "target='_blank'";
	}
?>
<a href="<?php echo $post_uri;?>" <?php echo $block_wrapper_attributes;?> <?php echo $target ?? '';?>>
	<?php echo $attributes['labelText'];?>
</a>