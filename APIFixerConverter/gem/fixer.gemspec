# frozen_string_literal: true

lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'fixer/version'

Gem::Specification.new do |spec|
  spec.name          = 'fixer'
  spec.version       = Fixer::VERSION
  spec.author        = ['Hakan Ensari']
  spec.email         = ['hakanensari@gmail.com']
  spec.summary       = <<-SUMMARY
    A wrapper to the exchange rate feeds of the European Central Bank
  SUMMARY
  spec.homepage      = 'https://github.com/hakanensari/fixer'
  spec.license       = 'MIT'
  spec.files         = Dir.glob('lib/**/*') + %w[README.md]
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler'
  spec.add_development_dependency 'minitest'
  spec.add_development_dependency 'rake'
  spec.add_development_dependency 'rubocop'
  spec.add_development_dependency 'vcr'
  spec.add_development_dependency 'webmock'
end
