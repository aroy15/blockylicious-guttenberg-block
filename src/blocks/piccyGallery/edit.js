import {
	useBlockProps,
	BlockControls
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
	const [editMode, setEditMode] = useState(true);
	return (
		<>
			<div {...blockProps}>
				A Message
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