// InnerBlocks creating extra wrapper div. So, using useInnerBlocksProps istead
import {
	useBlockProps,
	BlockControls,
	useInnerBlocksProps
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	Icon
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useState } from '@wordpress/element';

import './editor.scss';

export default function Edit(props) {
	const blockProps = useBlockProps();
	// This time not passing the blockProps inside the useInnerblocksProps becuase they will combile both
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: "piccy-gallery-inner-blocks"
		},
		{
			allowedBlocks: ["blockylicious/piccy-image"]
		}
	);
	const [editMode, setEditMode] = useState(true);
	return (
		<>
			<div {...blockProps}>
				{!!editMode &&
					<div className="edit-mode">
						<span className="piccy-label">{__("Piccy image gallery", metadata.textdomain)}</span>
						{/* <InnerBlocks allowedBlocks={["blockylicious/piccy-image"]} /> */}
						<div {...innerBlocksProps}/>
					</div>
				}
				{!editMode && <div className="preview-mode">Preview mode</div>}
			</div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={editMode ? <Icon icon="welcome-view-site"/> : <Icon icon="edit"/>} //any HTML or icon
						label={editMode ? __("Preview Gallery", metadata.textdomain) : __("Edit Gallery", metadata.textdomain)}
						onClick={() => setEditMode(prevState => !prevState)}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}