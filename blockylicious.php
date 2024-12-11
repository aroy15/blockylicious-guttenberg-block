<?php
/**
 * Plugin Name:       blockylicious
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
			$style_url = plugins_url("build/style-index.css",  __FILE__);
			wp_enqueue_style('blockylicious-style', $style_url, array());
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

			register_block_pattern_category('blockylicous', array(
				'label' => __('Blockylicious', 'blockylicous')
			));
			register_block_pattern('blockylicious/call-to-action-block', array(
				'categories' => array('call-to-action', 'blockylicous'),
				'title' => __('Blockylicous Call to Action', 'blockylicious'),
				'description' => __('A heading, paragraph, and clicky button block', 'blockylicious'),
				'content' => '<!-- wp:heading {"textAlign":"center"} -->
				<h2 class="wp-block-heading has-text-align-center">Lorem content title</h2>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"align":"center"} -->
				<p class="has-text-align-center">Lorem ipsum content</p>
				<!-- /wp:paragraph -->

				<!-- wp:blockylicious/clicky-group {"justifyContent":"center"} -->
				<!-- wp:blockylicious/clicky-button {"labelText":"Call To Action","style":{"color":{"background":"#000000","text":"#ffffff"},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"20px","right":"20px"}}}} /-->
				<!-- /wp:blockylicious/clicky-group -->'

			));


			//enqueuing new script file
			$script_url = plugins_url("./build/index.js", __FILE__);
			wp_enqueue_script('blockylicious-index', $script_url, array('wp-blocks', 'wp-element', 'wp-editor'));

			$style_url = plugins_url("build/style-index.css",  __FILE__);
			wp_enqueue_style('blockylicious-style', $style_url, array());
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

