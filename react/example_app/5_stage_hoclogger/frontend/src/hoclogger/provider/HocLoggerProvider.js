import React from 'react';
import LoggerContext from './LoggerContext';

export default class HocLoggerProvider extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loglevels: {
				LOG_ALL:"LOG_ALL",
				LOG_DEBUG:"LOG_DEBUG",
				LOG_INFO:"LOG_INFO",
				LOG_WARN:"LOG_WARN",
				LOG_ERROR:"LOG_ERROR",
				LOG_FATAL:"LOG_FATAL"
			},
			url: props.url
		}
	}
	
	hoclog = (severity,tag,desc) => {
		console.log(severity);
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify({
				severity:severity,
				tag:tag,
				desc:desc
			})
			
		}
		let url = "/hoclog"
		if(this.state.url) {
			url = this.state.url + "/hoclog"
		}
		fetch(url,request).then(response => {
			if(!response.ok) {
				console.log("Failed to log. Response:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
		
	}
	
	render() {
		return (
			<LoggerContext.Provider value={
				{
					state:this.state,
					hoclog:this.hoclog
				}
			}>
			{this.props.children}
			</LoggerContext.Provider>
		)
		
	}

}