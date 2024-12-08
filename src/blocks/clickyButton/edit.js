import { 
	useBlockProps,
	RichText,
	InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from "@wordpress/components";
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
	console.log({postTypes})
	const blockProps = useBlockProps();
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Destination", metadata.textdomain)}>
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