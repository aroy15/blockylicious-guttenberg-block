import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
// import { Icon } from '@wordpress/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPanorama } from '@fortawesome/free-solid-svg-icons';

/*==These three line code fixing the huge icon size issue ==*/
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
/*===X=====X=== */


import './editor.scss';

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useSelect((select) => {
		const data = select("core").getEntityRecord("postType", "attachment", props.attributes.imageId);
		return data;
	}, [props.attributes.imageId]); //second argument is a dependancy array

	const imageSelected = !!props.attributes.imageId && !!image?.source_url;


	return (
		<div {...blockProps}>
			{
				!!imageSelected && <img style={{display: "block", height:150, width:"100%", objectFit: "cover"}} src={image.source_url}/>
			}
			{
				!imageSelected && (
					<div style={{display:"flex", height:150, width:"100%", background: "#ffffff"}}>
						{/* <Icon icon="format-image" style={{margin: "auto"}}/> */}
						<FontAwesomeIcon icon={faPanorama} style={{margin: "auto"}}/>
					</div>
				)
				
			}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({open}) => {
						return (
							<button className='media-select' onClick={open}>
								{!!imageSelected ? __("Replace the image", metadata.textdomain) : 
								__("Select an image", metadata.textdomain)}
							</button>
						)
					}}
					value={props.attributes.imageId}
					onSelect={(item) => {
						props.setAttributes({
							imageId: item.id
						})
					}}
				/>
			</MediaUploadCheck>
		</div>
	)
}