import { __ } from '@wordpress/i18n';
import { 
	useSetting,
	ColorPalette 
} from '@wordpress/block-editor';
import { 
	HorizontalRule, 
	ToggleControl,
	RangeControl	
} from '@wordpress/components';
import metadata from '../block.json';

export const TopCurveSettings = (props) => {
	// Theme colors
	const themeColors = useSetting( 'color.palette' );

	// custom colors including theme colors
	const colors = [
		...themeColors,
		{ name: 'gray', color: '#eee' },
		{ name: 'black', color: '#000' },
		{ name: 'blue', color: '#00f' },
	];
	return (
		<>
			<HorizontalRule />
			<RangeControl
				min={100}
				max={300}
				value={props.attributes.topWidth || 100}
				onChange={(newValue) => {
					props.setAttributes({
						topWidth: parseInt(newValue)
					})
				}}
				label={__("Width", metadata.textdomain)}
			/>
			<RangeControl
				min={0}
				max={200}
				value={props.attributes.topHeight}
				onChange={(newValue) => {
					props.setAttributes({
						topHeight: parseInt(newValue)
					})
				}}
				label={__("Height", metadata.textdomain)}
			/>
			<HorizontalRule />
			<div style={{ display: 'flex' }}>
				<ToggleControl onChange={(isChecked) => {
					props.setAttributes({
						topFlipX: isChecked
					})
				}} checked={props.attributes.topFlipX} />
				<span>{__("Flip Horizontally", metadata.textdomain)}</span>
			</div>
			<div style={{ display: 'flex' }}>
				<ToggleControl onChange={(isChecked) => {
					props.setAttributes({
						topFlipY: isChecked
					})
				}} checked={props.attributes.topFlipY} />
				<span>{__("Flip Vertically ", metadata.textdomain)}</span>
			</div>
			<HorizontalRule />
			<div>
				<label>{__("Curve Color", metadata.textdomain)}</label>
				<ColorPalette
					// disableCustomColors
					colors={colors}
					value={props.attributes.topColor}
					onChange={(newValue) => {
						props.setAttributes({
							topColor: newValue
						})
					}}
				/>
			</div>
		</>
	)
}
