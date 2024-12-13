import { 
	useBlockProps,
	RichText,
	InspectorControls
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	SelectControl, 
	ToggleControl ,
	TextControl
} from "@wordpress/components";
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

export default function Edit(props) {
	const postTypes = useSelect((select) => {
		const data = select("core").getEntityRecords("root", "postType", {
			per_page: -1
		})
		return data?.filter(item => item.visibility.show_in_nav_menus && item.visibility.show_ui);
	})
	
	const posts = useSelect((select) => {
		const data = select("core").getEntityRecords("postType", props.attributes.postType, {
			per_page: -1
		})
		return data;
	}, [props.attributes.postType])
	
	const blockProps = useBlockProps();
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Destination", metadata.textdomain)}>
					{
						!props.attributes.enableCustomLink && 
						<SelectControl 
							label="Type"
							value={props.attributes.postType}
							onChange={newValue => props.setAttributes({
								postType: newValue
							})}
							options={[{
								label: __("Select a post type...", metadata.textdomain),
								value: ""
							}, ...(postTypes || []).map(postType => (
								{
									label: postType?.labels.singular_name,
									value: postType?.slug
								}
							))]}
						/>
					}
					{
						(!!props.attributes.postType && !props.attributes.enableCustomLink) &&
						<SelectControl 
							label={`Linked ${props.attributes.postType}`}
							value={props.attributes.linkedPost}
							onChange={newValue => props.setAttributes({
								linkedPost: newValue ? parseInt(newValue) : null
							})}
							options={[{
								label: __(`Select a ${props.attributes.postType} to link to`, metadata.textdomain),
								value: ""
							}, ...(posts || []).map(post => (
								{
									label: post?.title.rendered,
									value: post?.id
								}
							))]}
						/>
					}
					<div style={{display: 'flex'}}>
						<ToggleControl
							checked={props.attributes.enableCustomLink}
							onChange={isChecked => props.setAttributes({
								enableCustomLink:isChecked
							})}
						/>
						<span>{__("Custom URL",  metadata.textdomain)}</span>
					</div>
					{
						props.attributes.enableCustomLink && 
						<TextControl
							label={__("Input the custom URL", metadata.textdomain)}
							value={props.attributes.customLink}
							onChange={newURL => props.setAttributes({
								customLink: newURL
							})}
						/>
					}
					<div style={{display: 'flex'}}>
						<ToggleControl
							checked={props.attributes.linkNewTab}
							onChange={isChecked => props.setAttributes({
								linkNewTab:isChecked
							})}
						/>
						<span>{__("Open with new tab",  metadata.textdomain)}</span>
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<RichText 
					placeholder="Label text" 
					value={props.attributes.labelText}
					allowedFormats={[]} //disabled default text formatting
					multiline={false}
					onSplit={() => {}}
					onReplace={() => {}}
					onChange={newValue => props.setAttributes({
						labelText: newValue
					})}
				/>
			</div>
		</>
	)
}