import React from 'react'
import ListItem from './ListItem'

class RightBar extends React.Component{
    render() {
        return (
            <div className='rightWrapper'>
                <div className="listWrapper">
                {this.props.places.map(place => {
                
                    return(
                    < ListItem 
                        place={place} 
                        storedDetails={this.props.storedDetails}
                        handleStoredDetails={this.props.handleStoredDetails}
                        key={place.place_id} 
                        id={place.place_id} 
                        markers={this.props.markers} 
                        handleDetailRequest={this.props.handleDetailRequest} 
                        map={this.props.map}
                        currentPlace={this.props.currentPlace}
                    />
                    )})}
                </div>
            </div>
            )}}

export default RightBar;