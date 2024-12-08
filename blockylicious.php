<?php
/**
 * Plugin Name:       Blockylicious
 * Description:       A plugin of group blocks.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Anjon Roy
 * Author URI:		  https://anjonroy.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockylicious
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}



function convert_custom_properties($value)
{
	$prefix     = 'var:';
	$prefix_len = strlen($prefix);
	$token_in   = '|';
	$token_out  = '--';
	if (str_starts_with($value, $prefix)) {
		$unwrapped_name = str_replace(
			$token_in,
			$token_out,
			substr($value, $prefix_len)
		);
		$value          = "var(--wp--$unwrapped_name)";
	}

	return $value;
}
function create_custom_block_category($categories) {

	array_unshift($categories, [
		'slug' => 'blockylicious',
		'title' => 'Blockylicious'
	]);

	// // Category will show in the last
	// array_push($categories, [
	// 	'slug' => 'blockylicious',
	// 	'title' => 'Blockylicious'
	// ]);
	return $categories;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_blockylicious_block_init() {
	add_filter('block_categories_all', 'create_custom_block_category');
	register_block_type( __DIR__ . '/build/blocks/curvy' );
	register_block_type( __DIR__ . '/build/blocks/clickyGroup');
	register_block_type( __DIR__ . '/build/blocks/clickyButton');
}
add_action( 'init', 'create_block_blockylicious_block_init' );
