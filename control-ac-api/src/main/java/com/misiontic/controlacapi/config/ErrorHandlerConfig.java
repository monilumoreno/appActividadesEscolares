package com.misiontic.controlacapi.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.misiontic.controlacapi.exceptions.GeneralServiceException;
import com.misiontic.controlacapi.exceptions.NoDataFoundException;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;
import com.misiontic.controlacapi.utilities.WrapperResponse;
 
@Slf4j
@ControllerAdvice
public class ErrorHandlerConfig extends ResponseEntityExceptionHandler {

	@ExceptionHandler(Exception.class)
	//? retorna un genérico: entidad, clase, etc.
	public ResponseEntity<?> all(Exception e, WebRequest request) {
		log.error(e.getMessage(), e);
		WrapperResponse<?> response = new WrapperResponse<>(false, "Internal Server Error", null);
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(ValidateServiceException.class)
	public ResponseEntity<?> ValidateServiceException(ValidateServiceException e, WebRequest request) {
		log.info(e.getMessage(), e);
		WrapperResponse<?> response = new WrapperResponse<>(false, e.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NoDataFoundException.class)
	public ResponseEntity<?> NoDataFoundException(NoDataFoundException e, WebRequest request) {
		log.info(e.getMessage(), e);
		WrapperResponse<?> response = new WrapperResponse<>(false, e.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(GeneralServiceException.class)
	public ResponseEntity<?> GeneralServiceException(GeneralServiceException e, WebRequest request) {
		log.error(e.getMessage(), e);
		WrapperResponse<?> response = new WrapperResponse<>(false, "Internal Server Error", null);
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
