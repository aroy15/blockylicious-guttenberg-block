<?php
	$block_wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo $block_wrapper_attributes;?>>
	<div class="gallery-thubmnails">
		<?php echo $content; ?>
	</div>
	<div>
		<img class="image-preview"/>
	</div>
</div>