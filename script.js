var _cardsModule = new Cards( document.querySelector('.js-cards') );


function Cards ( element ) {

    // @formatter:off

    var _$element           = $( element );
    var _$buttonsNext       = _$element.find('.js-next');
    var _$buttonsPrevious   = _$element.find('.js-previous');
    var _$cardsContainer    = _$element.find('.js-cards-container');
    var _$cards             = _$cardsContainer.find(' > div');
    var _currentIndex       = -1;
    var _$window            = $(window);

    // @formatter:on


    _$window.on( 'resize', handleWindowResize );

    _$buttonsNext.click( handleNextClick );
    _$buttonsPrevious.click( handlePreviousClick );


    setSlide( 0 );

  
    function setSlide ( index ) {

        if( _currentIndex === index || index < 0 || index > _$cards.length - 1 ) return;

        _currentIndex = index;
              
        _$cards.removeClass( 'is-active' ); 
        $( _$cards[ _currentIndex ] ).addClass( 'is-active' );

        _$cards.each( function ( index, card ) {

            var $card = $( card );

            if( index < _currentIndex ) $card.attr( 'data-card-index', -1 );
            else $card.attr( 'data-card-index', index - _currentIndex );

        } );

        _currentIndex === 0 ? _$buttonsPrevious.attr( 'disabled', true ) : _$buttonsPrevious.removeAttr( 'disabled' );
        _currentIndex === _$cards.length - 1 ? _$buttonsNext.attr( 'disabled', true ) : _$buttonsNext.removeAttr( 'disabled' );

        updateLayout();

    }

    function handleNextClick ( event ) {

        event.preventDefault();

        next();

    }

    function handlePreviousClick ( event ) {

        event.preventDefault();

        previous();

    }

    function next () {

        setSlide( _currentIndex + 1 );

    }

    function previous () {

        setSlide( _currentIndex - 1 );

    }

    function handleWindowResize ( event ) {

        updateLayout();

    }

    function updateLayout () {

        var $currentCard = $( _$cards[ _currentIndex ] );
        _$cardsContainer.height( $currentCard.outerHeight() );

    }


}