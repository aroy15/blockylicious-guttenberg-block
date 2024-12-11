import { 
	registerFormatType, 
	applyFormat, 
	toggleFormat,
	removeFormat
} from "@wordpress/rich-text";
import { __ } from '@wordpress/i18n';
import { RichTextToolbarButton, ColorPalette } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Popover, PanelBody } from '@wordpress/components';
import lowHighlightIcon from './assets/low-highlight.svg';
import lowHighlightIconActive from './assets/low-highlight-active.svg';
import "./style.scss";

registerFormatType("blockylicious/low-highlight", {
	title: __("Low highlight", "blockylicious"),
	tagName: "span",
	className: "blockylicious-low-highlight",
	edit: ({onChange, value, contentRef, isActive}) => {
		const [showColors, setShowColors] = useState(false);
		const lowHighlight = value.activeFormats?.find(format => format.type === "blockylicious/low-highlight")
		const attributes = {
			...(lowHighlight?.attributes || {}), 
			...(lowHighlight?.unregisteredAttributes || {})
		}
		
		return (
			<>
				<RichTextToolbarButton 
					icon={<img height={24} width={24} src={isActive ? lowHighlightIconActive : lowHighlightIcon}/>} 
					title={__("Low highlight", "blockylicious")}
					onClick={() => {
						setShowColors(true);
					}}
				/>
				{
					!!showColors && 
					<Popover 
						onClose={() => setShowColors(false)}
						anchor={contentRef?.current}
					>
						<PanelBody>
							<ColorPalette
								value={attributes?.['data-color']}
								onChange={newValue => {
									if(newValue){
										onChange(
											applyFormat(value, {
												type: "blockylicious/low-highlight",
												attributes: {
													'data-color': newValue,
													style: `background-image: linear-gradient(to right, ${newValue}, ${newValue})`
												}
											}) // only apply not removalble
				
											// toggleFormat(value, {
											// 	type: "blockylicious/low-highlight"
											// }) //apply & remove
										)
									}else{
										onChange(
											removeFormat(value, "blockylicious/low-highlight")											
										)
									}
								}}
							/>
						</PanelBody>
					</Popover>
				}
			</>
		)
	}
})