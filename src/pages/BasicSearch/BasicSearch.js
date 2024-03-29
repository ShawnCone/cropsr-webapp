import React from 'react';
import './BasicSearch.css';
import CabbiHeader from '../../components/CabbiHeader/CabbiHeader';
import DropdownGenome from '../../components/DropdownGenome/DropdownGenome';
import SystemCheckbox from '../../components/SystemCheckbox/SystemCheckbox';
import CutRegionForm from '../../components/CutRegionForm/CutRegionForm';
import CropsrButton from '../../components/CropsrButton/CropsrButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearQueryResult } from '../../redux/actions/clearQueryResult';

/**
 * This page is responsible to take in search queries
 */

class BasicSearchscreen extends React.Component {

	render() {
		return (
			<div className="basicSearchMainContainer">
				<div className="basicSearchHeaderContainer"><CabbiHeader/></div>
				<div className='basicSearchContentContainer'>
					<div className='basicSearchDropDownContainer'>
						<DropdownGenome />
					</div>
					<div className='basicSearchCheckboxContainer'>
						<SystemCheckbox />
					</div>
					<div className='basicSearchCutRegionFormContainer'>
						<CutRegionForm />
					</div>
					<div className='basicSearchCropsrButtonContainer'>
						<Link to='/searchresults'>
							<CropsrButton/>
						</Link>
					</div>
				</div>
				
			</div>
			
		);
	};

	componentDidMount() {
		this.props.clearQueryResult();
	}

};

// Pass redux states to current component props
function mapStateToProps(state) {
	return {
        query: state.query,
		queryResult: state.query.queryResult
	}
}

// Pass actions and functions to update redux to current component props
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		clearQueryResult: clearQueryResult
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(BasicSearchscreen);
