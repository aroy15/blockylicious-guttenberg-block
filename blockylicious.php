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
namespace BlockyliciousPlugin;

if ( ! defined( 'ABSPATH' ) ) {
	die('Silence is golden.');
}

final class Blockylicious {
	static function init() {
		add_action('enqueue_block_assets', function() {
			wp_enqueue_style("dashicons");
		});
		add_action('init', function(){
			add_filter('block_categories_all', function($categories) {
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
			});
			register_block_type( __DIR__ . '/build/blocks/curvy' );
			register_block_type( __DIR__ . '/build/blocks/clickyGroup');
			register_block_type( __DIR__ . '/build/blocks/clickyButton');
			register_block_type( __DIR__ . '/build/blocks/piccyGallery');
			register_block_type( __DIR__ . '/build/blocks/piccyImage');
		});
	}

	static function convert_custom_properties($value)
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
}

Blockylicious::init();

